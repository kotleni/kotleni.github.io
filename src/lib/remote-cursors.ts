export interface RemoteCursorState {
    id: string;
    color: string;
    x: number;
    y: number;
    tx: number;
    ty: number;
    hasPosition: boolean;
}

export interface GarlandDrag {
    kind: 'ball' | 'rope';
    index: number;
}

export const remoteCursors = new Map<string, RemoteCursorState>();

export const remoteGarlandDrags = new Map<string, GarlandDrag>();

export interface GhostCursorState {
    id: string;
    x: number;
    y: number;
}

export const ghostCursors = new Map<string, GhostCursorState>();

let localDragListener: ((drag: GarlandDrag | null) => void) | null = null;

export function setLocalGarlandDragListener(
    listener: ((drag: GarlandDrag | null) => void) | null,
) {
    localDragListener = listener;
}

export function emitLocalGarlandDrag(drag: GarlandDrag | null) {
    if (localDragListener) localDragListener(drag);
}
