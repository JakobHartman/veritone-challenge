import React, {useState, useEffect} from 'react';
import { Item } from '../../types';


export default function UseShoppingList(props?: any) {
    const [shoppingList, setShoppingList] = useState<Item[]>([]);

    function addToShoppingList(item: Item) {
        setShoppingList(shoppingList => [...shoppingList, item])
    }

    function checkItem(itemID: string){
        const item = shoppingList.find((item) => {
            return item.id === itemID
        })
        if(item){
            item.isChecked = !item.isChecked
        }
    }

    function removeFromShoppingList(itemID: string){
        setShoppingList(shoppingList.splice(findItemIndex(itemID), 1));
    }

    function overwriteItem(itemID: string, item: Item) {
        shoppingList[findItemIndex(itemID)] = item
        setShoppingList(shoppingList)
    }

    function findItemIndex(itemID: string){
        return shoppingList.findIndex((item) => {
            return item.id === itemID
        })
    }

    return { shoppingList, addToShoppingList, checkItem, removeFromShoppingList, overwriteItem}

}