import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactionsContext'
import { formatMoney } from '../../utils/moneyFormater'

import { Container } from './styles'

export function Summary() {
	const { transactions } = useTransactions()

	const summary = transactions.reduce(
		(acc, transaction) => {
			if (transaction.type === 'deposit') {
				acc.deposits += transaction.amount
				acc.total += transaction.amount
			} else {
				acc.withdraw += transaction.amount
				acc.total -= transaction.amount
			}
			return acc
		},
		{
			deposits: 0,
			withdraw: 0,
			total: 0,
		}
	)

	return (
		<Container>
			<div>
				<header>
					<p>Entradas</p>
					<img src={incomeImg} alt='Entradas' />
				</header>
				<strong>{formatMoney(summary.deposits)}</strong>
			</div>
			<div>
				<header>
					<p>Saídas</p>
					<img src={outcomeImg} alt='Saídas' />
				</header>
				<strong>-{formatMoney(summary.withdraw)}</strong>
			</div>
			<div className='highlight-background'>
				<header>
					<p>Total</p>
					<img src={totalImg} alt='Total' />
				</header>
				<strong>{formatMoney(summary.total)}</strong>
			</div>
		</Container>
	)
}
