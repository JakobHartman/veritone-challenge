import { useState } from 'react';
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
        const newList = shoppingList.filter((item) => {
            return item.id !== itemID;
        });
        setShoppingList(newList);
    }

    function overwriteItem(item: Item) {
        removeFromShoppingList(item.id);
        addToShoppingList(item);
    }

    return { shoppingList, addToShoppingList, checkItem, removeFromShoppingList, overwriteItem}

}