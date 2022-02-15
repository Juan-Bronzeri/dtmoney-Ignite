import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { api } from '../services/api'

interface ITransactionResponse {
	id: number
	title: string
	amount: number
	type: string
	category: string
	createdAt: string
}

type TransactionInput = Omit<ITransactionResponse, 'id' | 'createdAt'>

interface ITransactionProvider {
	children: ReactNode
}

interface ITransactionsContextData {
	transactions: ITransactionResponse[]
	createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<ITransactionsContextData>(
	{} as ITransactionsContextData
)

export function TransactionsProvider({ children }: ITransactionProvider) {
	const [transactions, serTransactions] = useState<ITransactionResponse[]>([])

	useEffect(() => {
		api
			.get('/transactions')
			.then((response) => serTransactions(response.data.transactions))
	}, [])

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', {
			...transactionInput,
			createdAt: new Date(),
		})
		const { transaction } = response.data

		serTransactions([...transactions, transaction])
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	)
}

export function useTransactions() {
	const context = useContext(TransactionsContext)

	return context
}
