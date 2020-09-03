import React, { createContext, useState } from 'react';
import { SpotCreateModal } from './Spot/create.spot.modal'
import { SpotDeleteModal } from './Spot/delete.spot.modal';
import { AssetCreateModal } from './Asset/create.asset.modal';
import { AssetDeleteModal } from "./Asset/delete.asset.modal";
import { ContractDeleteModal } from './Contract/delete.contract.modal';
import { AssetUpdateModal } from './Asset/update.asset.modal';
import { SpotUpdateModal } from './Spot/update.spot.modal';

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
    openUpdateAsset: () => { },
    closeUpdateAsset: () => { },
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

    const openUpdateAsset = () => setState({ ...state, isUpdateAssetOpen: true })
    const closeUpdateAsset = () => setState({ ...state, isUpdateAssetOpen: false })
    const openUpdateSpot = () => setState({ ...state, isUpdateSpotOpen: true })
    const closeUpdateSpot = () => setState({ ...state, isUpdateSpotOpen: false })

    const openDeleteContract = () => setState({ ...state, isDeleteContractOpen: true });
    const closeDeleteContract = () => setState({ ...state, isDeleteContractOpen: false });
    const openDeleteAsset = () => setState({ ...state, isDeleteAssetOpen: true });
    const closeDeleteAsset = () => setState({ ...state, isDeleteAssetOpen: false });
    const openDeleteSpot = () => setState({ ...state, isDeleteSpotOpen: true });
    const closeDeleteSpot = () => setState({ ...state, isDeleteSpotOpen: false });

    const clearAll = () => setState({ ...state, ...init });

    return <>
        <ModalProvider value={{
            ...ModalContext,
            ...state,
            openCreateAsset,
            closeCreateAsset,
            openCreateSpot,
            closeCreateSpot,
            openUpdateAsset,
            closeUpdateAsset,
            openUpdateSpot,
            closeUpdateSpot,
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
            {state.isUpdateAssetOpen && <AssetUpdateModal isOpen={state.isUpdateAssetOpen} onClose={closeUpdateAsset} />}
            {state.isUpdateSpotOpen && <SpotUpdateModal isOpen={state.isUpdateSpotOpen} onClose={closeUpdateSpot} />}
            {state.isDeleteSpotOpen && <SpotDeleteModal isOpen={state.isDeleteSpotOpen} onClose={closeDeleteSpot} />}
            {state.isDeleteAssetOpen && <AssetDeleteModal isOpen={state.isDeleteAssetOpen} onClose={closeDeleteAsset} />}
            {state.isDeleteContractOpen && <ContractDeleteModal isOpen={state.isDeleteContractOpen} onClose={closeDeleteContract} />}
            {props.children}
        </ModalProvider>
    </>
}


export { ModalControl, ModalContext, ModalProvider, ModalConsumer };