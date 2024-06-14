import { observer } from "mobx-react-lite";
import { Header, Modal } from "semantic-ui-react";
import { useStore } from "../stores/store";

// eslint-disable-next-line react-refresh/only-export-components
export default observer ( function ModalContainer() {
    const {modalStore} = useStore();
    return (
        <Modal 
            open={modalStore.modal.open} 
            onClose={modalStore.closeModal}
            size="tiny"
            closeIcon
        >
            {modalStore.modal.header !== '' && (
                <Header content={modalStore.modal.header} />
            )}
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})