"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canEdit = (role) => {
    if (role === 'admin' || role === 'editor')
        return true;
    return false;
};
console.log(canEdit('admin'));
console.log(canEdit('editor'));
console.log(canEdit('viewer'));
//# sourceMappingURL=6.canEdit.js.map