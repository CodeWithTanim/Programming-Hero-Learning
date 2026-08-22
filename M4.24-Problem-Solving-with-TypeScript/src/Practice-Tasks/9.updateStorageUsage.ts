type UploadAction = {
    type: 'upload'
    sizeMB: number
}

type DeleteAction = {
    type: 'delete'
    sizeMB: number
}


function updateStorageUsage(currentUsagesMB: number, action: UploadAction | DeleteAction): number {
    if (action.type === 'upload') {
        return currentUsagesMB + action.sizeMB;
    }

    return Math.max(0, currentUsagesMB - action.sizeMB);
}


console.log(updateStorageUsage(2000, { type: "upload", sizeMB: 500 }));
console.log(updateStorageUsage(2000, { type: "delete", sizeMB: 800 }));
console.log(updateStorageUsage(300, { type: "delete", sizeMB: 1000 }));