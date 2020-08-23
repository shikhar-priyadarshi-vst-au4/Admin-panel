import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/core";

export function AdminModal({ buttonGroup, form, heading = "", isOpen, onCloseEvent }) {

    const initialRef = React.useRef();
    const finalRef = React.useRef();

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onCloseEvent}
            >
                <ModalOverlay />
                <ModalContent bg={"white.100"}>
                    <ModalHeader>{heading}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {form}
                    </ModalBody>
                    <ModalFooter>
                        {buttonGroup}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
