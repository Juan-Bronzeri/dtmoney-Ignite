import { useTransactions } from '../../hooks/useTransactionsContext'
import { formatMoney } from '../../utils/moneyFormater'
import { Container } from './styles'

export function TransactionsTable() {
	const { transactions } = useTransactions()
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
								{formatMoney(transation.amount)}
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
