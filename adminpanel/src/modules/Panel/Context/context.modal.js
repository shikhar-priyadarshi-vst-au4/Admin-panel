import React, { createContext, useState } from 'react';
import { SpotCreateModal } from './Modal/Spot/create.spot.modal'
import { SpotDeleteModal } from './Modal/Spot/delete.spot.modal';
import { AssetCreateModal } from './Modal/Asset/create.asset.modal';
import { AssetDeleteModal } from "./Modal/Asset/delete.asset.modal";
import { ContractDeleteModal } from './Modal/Contract/delete.contract.modal';

const ModalContext = createContext({
    isCreateAssetOpen: false,
    isCreateSpotOpen: false,
    isUpdateAssetOpen: false,
    isUpdateSpotOpen: false,
    isDeleteAssetOpen: false,
    isDeleteSpotOpen: false,
    isDeleteContractOpen: false,
    selectedUpdateAsset: "",
    selectedUpdateSpot: "",
    openCreateAsset: () => { },
    closeCreateAsset: () => { },
    openUpdateSpot: () => { },
    closeUpdateSpot: () => { },
    openDeleteContract: () => { },
    closeDeleteContract: () => { },
    openDeleteAsset: () => { },
    closeDeleteAsset: () => { },
    openDeleteSpot: () => { },
    closeDeleteSpot: () => { },
    setAsset: () => { },
    setSpot: () => { },
    clearAll: () => { }
});

const { Provider: ModalProvider, Consumer: ModalConsumer } = ModalContext;

const ModalControl = (props) => {
    const init = {
        isCreateAssetOpen: false,
        isCreateSpotOpen: false,
        isUpdateAssetOpen: false,
        isUpdateSpotOpen: false,
        isDeleteAssetOpen: false,
        isDeleteSpotOpen: false,
        isDeleteContractOpen: false,
        selectedUpdateAsset: "",
        selectedUpdateSpot: "",
    }
    const [state, setState] = useState(init);

    const openCreateAsset = () => setState({ ...state, isCreateAssetOpen: true });
    const closeCreateAsset = () => setState({ ...state, isCreateAssetOpen: false });
    const openCreateSpot = () => setState({ ...state, isCreateSpotOpen: true });
    const closeCreateSpot = () => setState({ ...state, isCreateSpotOpen: false });

    const openDeleteContract = () => setState({ ...state, isDeleteContractOpen: true });
    const closeDeleteContract = () => setState({ ...state, isDeleteContractOpen: false });
    const openDeleteAsset = () => setState({ ...state, isDeleteAssetOpen: true });
    const closeDeleteAsset = () => setState({ ...state, isDeleteAssetOpen: false });
    const openDeleteSpot = () => setState({ ...state, isDeleteSpotOpen: true });
    const closeDeleteSpot = () => setState({ ...state, isDeleteSpotOpen: false });

    const clearAll = () => setState({ ...state, ...init });

    //  const openUpdateSpot = () => { }
    //  const closeUpdateSpot = () => { }

    return <>
        <ModalProvider value={{
            ...ModalContext,
            ...state,
            openCreateAsset,
            closeCreateAsset,
            openCreateSpot,
            closeCreateSpot,
            openDeleteContract,
            closeDeleteContract,
            openDeleteAsset,
            closeDeleteAsset,
            openDeleteSpot,
            closeDeleteSpot,
            clearAll
        }}>
            {state.isCreateSpotOpen && <SpotCreateModal isOpen={state.isCreateSpotOpen} onClose={closeCreateSpot} />}
            {state.isCreateAssetOpen && <AssetCreateModal isOpen={state.isCreateAssetOpen} onClose={closeCreateAsset} />}
            {state.isDeleteSpotOpen && <SpotDeleteModal isOpen={state.isDeleteSpotOpen} onClose={closeDeleteSpot} />}
            {state.isDeleteAssetOpen && <AssetDeleteModal isOpen={state.isDeleteAssetOpen} onClose={closeDeleteAsset} />}
            {state.isDeleteContractOpen && <ContractDeleteModal isOpen={state.isDeleteContractOpen} onClose={closeDeleteContract} />}
            {props.children}
        </ModalProvider>
    </>
}


export { ModalControl, ModalContext, ModalProvider, ModalConsumer };