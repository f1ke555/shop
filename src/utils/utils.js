import {getDocs} from "firebase/firestore";

export const getDocumentsData = async (colRef) => {
    const snapshots = await getDocs(colRef)
    const docs = snapshots.docs.map((doc) => {
        const data = doc.data()
        data.id = doc.id
        return data
    });
    return docs
}
export const numWord = (items) => {
    const words = ['товар', 'товара', 'товаров']
    const value = items?.reduce((acc, curr) => {
        acc += curr.item.count
        return Math.abs(acc) % 100
    }, 0)
    let num = value % 10;
    if(value > 10 && value < 20) return words[2];
    if(num > 1 && num < 5) return words[1];
    if(num == 1) return words[0];
    return words[2];
}