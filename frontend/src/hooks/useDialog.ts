// zustand is used for state management, basically makes it easy to change values
import {create} from "zustand"

// defining the prop types of the dialog component
interface DialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData(data: any): void;
}

export const useDialog = create<DialogProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
    data: {},
    setData: (data) => set({data: {data}}),
}))