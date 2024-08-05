import { useState, useEffect } from "react";
import { EditorEngine } from "@/lib/editor/engine";
import { WebviewTag } from "electron";
import { sendAnalytics } from "@/lib/utils";
import { editorEngine } from "@/lib/editor/engine";

type ContextMenuItem = { label: string; shortcut?: string; isHeader?: boolean; onClick?: () => void; };

const useContextMenu = ({ 
  webviewRef,
  contextMenuRef,
 } : { 
  webviewRef: React.RefObject<WebviewTag | null>,
  contextMenuRef: React.RefObject<HTMLDivElement | null>,
}) => {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuData, setContextMenuData] = useState<ContextMenuItem[] | null>(null);

  const [isWebviewFocused, setIsWebviewFocused] = useState<boolean>(false);  
  const [isLayersPanelFocused, setIsLayersPanelFocused] = useState<boolean>(false);
  const [isEditPanelFocused, setIsEditPanelFocused] = useState<boolean>(false);

  useEffect(() => {
    const contextMenu = contextMenuRef.current;
    const webview = webviewRef.current;

    if (editorEngine.mode === "Interact") {
        setIsContextMenuVisible(false);
        return;
    }

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        
        if (contextMenu && webview && editorEngine && editorEngine.mode === "Design") {

            let x = e.clientX;
            let y = e.clientY;

            if (x > window.innerWidth / 2) {
                x = x - contextMenu.clientWidth;
            }

            if (y > window.innerHeight / 2) {
                y = y - contextMenu.clientHeight;
            }

            if (isEditPanelFocused) {
                setContextMenuData(() => [
                    {
                        label: "Edit one",
                        shortcut: "⌘1",
                    },
                    {
                        label: "Edit two",
                        shortcut: "⌘2",
                    },
                ]);
            }

            else if (isLayersPanelFocused && editorEngine.state.selected[0]) {

                const instance = editorEngine.ast.map.getInstance(editorEngine.state.selected[0].selector);
                const root = editorEngine.ast.map.getRoot(editorEngine.state.selected[0].selector);

                setContextMenuData(() => {

                    let data: ContextMenuItem[] = [
                    {
                        label: editorEngine.state.selected[0].tagName,
                        isHeader: true,
                    }];

                    if (root) {
                        data.push({
                            label: "Edit root",
                            shortcut: "⌘1",
                            onClick: () => {
                                editorEngine.code.viewSource(root);
                                sendAnalytics("view source code");
                            }
                        })
                    }

                    if (instance) {
                        data.push({
                            label: "Edit instance",
                            shortcut: "⌘2",
                            onClick: () => {
                                editorEngine.code.viewSource(instance);
                                sendAnalytics("view source code");
                            }
                        });
                    }
                
                    return data;
                });
            }

            else if (isWebviewFocused && editorEngine.state.selected[0]) {

                const instance = editorEngine.ast.map.getInstance(editorEngine.state.selected[0].selector);
                const root = editorEngine.ast.map.getRoot(editorEngine.state.selected[0].selector);

                setContextMenuData(() => {

                    let data: ContextMenuItem[] = [
                    {
                        label: editorEngine.state.selected[0].tagName,
                        isHeader: true,
                    }];

                    if (root) {
                        data.push({
                            label: "Edit root",
                            shortcut: "⌘1",
                            onClick: () => {
                                editorEngine.code.viewSource(root);
                                sendAnalytics("view source code");
                            }
                        })
                    }

                    if (instance) {
                        data.push({
                            label: "Edit instance",
                            shortcut: "⌘2",
                            onClick: () => {
                                editorEngine.code.viewSource(instance);
                                sendAnalytics("view source code");
                            }
                        });
                    }
                
                    return data;
                });
            }

            else { return };

            setIsContextMenuVisible(true);
            setContextMenuPosition({ x, y });
        }
    };

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        setIsContextMenuVisible(false);

    }

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
        window.removeEventListener('contextmenu', handleContextMenu);
        window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [contextMenuRef, webviewRef, isWebviewFocused, isLayersPanelFocused, isEditPanelFocused, editorEngine]);

  return {
    isContextMenuVisible,
    contextMenuPosition,
    contextMenuData,
    setIsContextMenuVisible,
    setIsWebviewFocused,
    setIsLayersPanelFocused,
    setIsEditPanelFocused,
  };
};

export { useContextMenu };