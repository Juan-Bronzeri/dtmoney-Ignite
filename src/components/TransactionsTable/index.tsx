import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Container } from './styles'

interface ITransactionResponse {
	id: number
	title: string
	amount: number
	type: string
	category: string
	createdAt: string
}

export function TransactionsTable() {
	const [transactions, serTransactions] = useState<ITransactionResponse[]>([])

	useEffect(() => {
		api
			.get('/transactions')
			.then((response) => serTransactions(response.data.transactions))
	}, [])

	return (
		<Container>
			<table>
				<thead>
					<tr>
						<th>Título</th>
						<th>Valor</th>
						<th>Categoria</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transation) => (
						<tr key={transation.id}>
							<td>{transation.title}</td>
							<td className={transation.type}>
								{new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(transation.amount)}
							</td>
							<td>{transation.category}</td>
							<td>
								{' '}
								{new Intl.DateTimeFormat('pt-BR').format(
									new Date(transation.createdAt)
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	)
}
