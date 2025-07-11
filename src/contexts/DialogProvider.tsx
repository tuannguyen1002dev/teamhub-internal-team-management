'use client'

import React, { useEffect, useState, useContext, createContext, ReactNode } from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react"



interface DialogData {
	title?: string;
	content: ReactNode;
}

interface DialogContextProps {
	openDialog: (data: DialogData) => void;
	closeDialog: () => void;
}

const DialogContext = createContext<DialogContextProps | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
	const [dialogData, setDialogData] = useState<DialogData | null>(null);

	const openDialog = (data: DialogData) => setDialogData(data);
	const closeDialog = () => setDialogData(null);

	return (
		<DialogContext.Provider value={{ openDialog, closeDialog }}>
			{children}
			{dialogData &&
				ReactDOM.createPortal(
					// <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
					// 	<div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative">
					// 		<button
					// 			className="absolute top-3 right-3 text-gray-500"
					// 			onClick={closeDialog}>
					// 			<X />
					// 		</button>
					// 		<div className="dialog-title">
					// 			{dialogData.title}
					// 		</div>
					// 		<div className="w-100 border-t-1 border-gray-400" />
					// 		<div className="dialog-body ">
					// 			{dialogData.content}
					// 		</div>
					// 	</div>
					// </div>
					<div className="dialog-wrapper fixed flex justify-center items-center inset-0 z-50 bg-black/50">
						<div className="bg-white w-fit h-fit rounded-2xl min-w-lg">
							<div className="p-3 flex flex-row justify-between items-center border-b-1 border-gray-500 w-full">
								<span className="text-xl text-black/50 select-none">
									{dialogData.title}
								</span>
								<button className="rounded-4xl text-gray-700 bg-transparent hover:bg-gray-300 p-1 transition-all duration-500 ease-in-out" onClick={closeDialog}>
									<X />
								</button>
							</div>
							<div className="p-6">
								{dialogData.content}
							</div>
						</div>
					</div>,
					document.body
				)}
		</DialogContext.Provider>
	)
}

export default function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider");
	}
	return context;
};
