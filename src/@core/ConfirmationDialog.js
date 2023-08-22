import { useState, useCallback } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const useConfirmationDialog = () => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState(null)

    const showConfirmationDialog = useCallback(opts => {
        setOpen(true)
        setOptions(opts)
    }, [])

    const ConfirmationDialog = () => (
        <Modal
            isOpen={open}
            toggle={() => {
                options?.onCancel?.()
                setOpen(false)
            }}
            backdrop="static"
        >
            <ModalHeader toggle={() => {
                options?.onCancel?.()
                setOpen(false)
            }}>{options?.title}</ModalHeader>
            <ModalBody>{options?.description}</ModalBody>
            <ModalFooter>
                <Button
                    color="secondary"
                    onClick={() => {
                        options?.onCancel?.()
                        setOpen(false)
                    }}
                >
                    {options?.cancelText}
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        options?.onConfirm()
                        setOpen(false)
                    }}
                >
                    {options?.confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    )

    return [ConfirmationDialog, showConfirmationDialog]
}
