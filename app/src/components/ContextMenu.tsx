import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { observer } from 'mobx-react-lite';

interface ContextMenuProps {
    x: number;
    y: number;
    data: Array<{ label: string; shortcut?: string; isHeader?: boolean; onClick?: () => void; }> | null;
    isHidden: boolean;
}

const ContextMenu = observer(forwardRef<HTMLDivElement, ContextMenuProps>(({ x, y, data, isHidden }, ref) => {
    return (
        <div 
            ref={ref} 
            style={{ left: x, top: y, zIndex: 100 }} 
            className={
                cn(isHidden ? "opacity-100" : "opacity-0", `absolute border-[#2b2b2b] min-w-[4rem] overflow-hidden
                 rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 
                 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
                 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
                 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
                 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-64`)
            }
        >
            <div className="px-0.5 bg-[#080808] min-w-[8rem] overflow-hidden
                rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in 
                data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
                data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 
                data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 
                data-[side=top]:slide-in-from-bottom-2"
            >
                {data?.map((item, index) => {
                    const { label, shortcut, isHeader, onClick } = item;
                    return <ContextMenuItem key={`${index}-${label}`} label={label} shortcut={shortcut} isHeader={isHeader} onClick={onClick} />;
                })}
            </div>
        </div>
    );
}));

const ContextMenuItem = ({ label, shortcut, isHeader, onClick }: { label: string; shortcut?: string; isHeader?: boolean; onClick?: () => void; }) => {
    return (
        <div 
            className={cn(isHeader ? "border-b-1 border-[#333333]" : "hover:bg-[#333333] hover:text-white", `text-[#acacac] my-0.5 font-semibold tracking-wide px-1 relative 
                flex cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none focus:bg-accent 
                focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50`)} 
        >
            <div className="px-1 flex flex-row w-full" onClick={onClick}>
                <span>{label}</span>
                {shortcut && (
                    <span className="ml-auto text-sm tracking-widest text-muted-foreground bg-[#333333] px-1 rounded">
                        {` ${shortcut} `}
                    </span>
                )}
            </div>
    </div>
    );
};

export default ContextMenu;