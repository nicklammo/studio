import { useRef } from 'react';
import Canvas from './Canvas';
import EditPanel from './EditPanel';
import LayersPanel from './LayersPanel';
import EditorTopBar from './TopBar';
import WebviewArea from './WebviewArea';
import ContextMenu from '@/components/ContextMenu';
import { useContextMenu } from '@/components/useContextMenu';

function ProjectEditor() {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const webviewRef = useRef<Electron.WebviewTag>(null);

    const { 
        isContextMenuVisible, 
        contextMenuPosition,
        contextMenuData,
        setIsContextMenuVisible,
        setIsWebviewFocused,
        setIsLayersPanelFocused,
        setIsEditPanelFocused,
    } = useContextMenu({ webviewRef, contextMenuRef });

    return (
        <>
            <ContextMenu 
                x={contextMenuPosition.x} 
                y={contextMenuPosition.y} 
                data={contextMenuData}
                isHidden={isContextMenuVisible}
                ref={contextMenuRef} 
            />
            <div className="relative flex flex-row h-[calc(100vh-2.5rem)]">
                <Canvas>
                <WebviewArea 
                    webviewRef={webviewRef} 
                    setIsContextMenuVisible={setIsContextMenuVisible} // for further accuracy
                    setIsWebviewFocused={setIsWebviewFocused}
                />
                </Canvas>
                <div className="absolute top-0 w-full">
                    <EditorTopBar />
                </div>
                <div className="absolute top-10 left-0">
                    <LayersPanel setIsLayersPanelFocused={setIsLayersPanelFocused} />
                </div>
                <div className="absolute top-10 right-0">
                    <EditPanel setIsEditPanelFocused={setIsEditPanelFocused} />
                </div>
            </div>
        </>
    );
}

export default ProjectEditor;
