import Modal from 'react-modal'

interface INewTransactionModal {
	isOpen: boolean
	onRequestClose: () => void
}

export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: INewTransactionModal) {
	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<h2>Cadastrar transação</h2>
		</Modal>
	)
}
