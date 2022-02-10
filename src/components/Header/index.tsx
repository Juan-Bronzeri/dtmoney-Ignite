import logo from '../../assets/logo.svg'

import { Container, Content } from './styles'

interface IHeader {
	onOpenNewTransactionModal: () => void
}

export function Header({ onOpenNewTransactionModal }: IHeader) {
	return (
		<Container>
			<Content>
				<img src={logo} alt='dt money' />
				<button type='button' onClick={onOpenNewTransactionModal}>
					Nova transação
				</button>
			</Content>
		</Container>
	)
}
