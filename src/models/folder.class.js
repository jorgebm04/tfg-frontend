export class Folder {
    folderId = '';
    name = '';
    parentFolderId = ''

    constructor(folderId,name,parentFolderId) {
        this.folderId = folderId;
        this.name = name;
        this.parentFolderId = parentFolderId;
    }
}