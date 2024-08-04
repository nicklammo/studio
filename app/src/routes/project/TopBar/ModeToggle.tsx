import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { EditorMode } from '@/lib/editor/engine';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { editorEngine } from '@/lib/editor/engine';

const ModeToggle = observer(() => {
    const [mode, setMode] = useState<EditorMode>(editorEngine.mode);

    return (
        <ToggleGroup
            className="h-6 my-auto font-normal "
            type="single"
            value={mode}
            onValueChange={(value) => {
                if (value) {
                    editorEngine.mode = value as EditorMode;
                    setMode(value as EditorMode);
                }
            }}
        >
            <ToggleGroupItem
                variant={'overline'}
                value={EditorMode.Design}
                aria-label={EditorMode.Design + ' Mode'}
            >
                {EditorMode.Design}
            </ToggleGroupItem>
            <ToggleGroupItem
                variant={'overline'}
                value={EditorMode.Interact}
                aria-label={EditorMode.Interact + ' Mode'}
            >
                {EditorMode.Interact}
            </ToggleGroupItem>
        </ToggleGroup>
    );
});

export default ModeToggle;
