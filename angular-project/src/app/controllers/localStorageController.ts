class LocalStorageController {
    getItems() : string[]  {
        return JSON.parse(localStorage.getItem("blocks") || "issue");
    }

    updateItems(items : string[]) {
        localStorage.setItem("blocks", JSON.stringify(items));
    }

    removeItemByIndex(index : number) {
        let current : string[] = localStorage.length > 0 ? JSON.parse(localStorage.getItem("blocks") || "XD") : [];
        current.splice(index, 1);
        this.updateItems(current);
    }

    editItem(index : number, newContent : string) {
        let current : string[] = localStorage.length > 0 ? JSON.parse(localStorage.getItem("blocks") || "XD") : [];
        current[index] = newContent;
        this.updateItems(current);
    }

    pushItem(item : string) {
        let current : string[] = localStorage.length > 0 ? JSON.parse(localStorage.getItem("blocks") || "XD") : [];
        current.push(item);
        this.updateItems(current);
    }

}



export const localStorageController : LocalStorageController = new LocalStorageController();