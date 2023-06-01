import {collection, doc, getFirestore, query, where} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {apiService} from "../service/api.service";
import {getDocumentsData} from "../utils/utils";
import {firebaseConfig} from "../const/api.const";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

class ApiTransport {
    async getAllDevice() {
        const colRef = collection(database, 'items')
        const docs = await getDocumentsData(colRef)
        apiService.allDevice$.next(docs)
    }

    async getBasketDevice(user) {
        const colRef = collection(database, 'items_basket' + user?.email)
        const docs = await getDocumentsData(colRef)
        apiService.basketDevice$.next(docs)
    }

    async getCompareDevice(user) {
        const colRef = collection(database, 'items_compare' + user?.email)
        const docs = await getDocumentsData(colRef)
        apiService.compareDevice$.next(docs)
    }

    async getFavoriteDevice(user) {
        const colRef = collection(database, 'item__favorite' + user?.email)
        const docs = await getDocumentsData(colRef)
        apiService.favoriteDevice$.next(docs)
    }

    async getCategory() {
        const colRef = collection(database, 'category')
        const docs = await getDocumentsData(colRef)
        apiService.allCategory$.next(docs)
    }

    async getDeviceById() {
        const docRef = doc(database, "items", `${apiService.deviceId$.value}`);
        const docs = await getDocumentsData(docRef)
        console.log(docs)
    }

    async getCategoryDevice(location) {
        console.log(location)
        const link = apiService.changeCategory$.value ? apiService.changeCategory$.value : location
        const colRef = query(collection(database, "items"), where("category", "==", `${link}`));
        const docs = await getDocumentsData(colRef)
        apiService.categoryDevice$.next(docs)
    }

    async getBrandDevice(location) {
        const linkBrand = apiService.changeBrand$.value ? apiService.changeBrand$.value : location
        const colRef = query(collection(database, "items"),
            where("brand", "==", `${linkBrand}`),
            where("category", "==", `${apiService.changeCategory$.value}`)
        );
        const docs = await getDocumentsData(colRef)
        apiService.brandDevice$.next(docs)
    }
}




export const apiTransport = new ApiTransport();



