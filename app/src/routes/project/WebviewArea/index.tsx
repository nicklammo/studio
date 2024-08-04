import { WebviewMessageBridge } from '@/lib/editor/messageBridge';
import { WebviewMetadata } from '@/lib/models';
import { nanoid } from 'nanoid';
import Frame from './Frame';
import Overlay from './Overlay';
import { editorEngine } from '@/lib/editor/engine';
import { observer } from 'mobx-react-lite';

const WebviewArea = observer(({
    webviewRef,
    setIsContextMenuVisible,
    setIsWebviewFocused,
}: {
    webviewRef: React.RefObject<Electron.WebviewTag>;
    setIsContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsWebviewFocused: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const messageBridge = new WebviewMessageBridge(editorEngine);
    const webviews: WebviewMetadata[] = [
        {
            id: nanoid(),
            title: 'Desktop',
            src: 'http://localhost:3000/',
        },
    ];

    return (
        <>
        <Overlay>
            <div className="grid grid-flow-col gap-72">
                {webviews.map((metadata, index) => (
                    <Frame
                        key={index}
                        metadata={metadata}
                        messageBridge={messageBridge}
                        webviewRef={webviewRef}
                        setIsContextMenuVisible={setIsContextMenuVisible}
                        setIsWebviewFocused={setIsWebviewFocused}
                    />
                ))}
            </div>
        </Overlay>
        </>
    );
});

export default WebviewArea;