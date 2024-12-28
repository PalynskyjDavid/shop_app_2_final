import { useMemo, useState, useContext, useEffect } from "react";
import DetailContext from "../context/DetailContext.js";
import axiosApi from "../hooks/useAxiosApi.js";
import useUserContext from "../hooks/useUser.js";


export function DetailProvider({ children }) {

    const { loggedInUser } = useUserContext();
    const [dataRaw, setDataRaw] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [showMarked, setShowMarked] = useState(2);
    const [resolved, setResolved] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosApi.get("/cart/list");
                setDataRaw(response.data.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                //console.log("detailProvider cart/list", dataRaw)
                setLoadingData(false);
            }
        };
        fetchData();
    }, []); //runs once after the initial render

    const cartFilterByOwnerOrMember = (item) => {
        const isOwner = item.owner === loggedInUser._id;
        // console.log("Is owner? ", isOwner)
        const isMember = item.memberList.flat(Infinity).includes(loggedInUser._id); //.flat zmeni vicerozmerne pole na 1d pole
        // console.log("Is member? ", isMember)
        return isOwner || isMember;
    };

    const cartFilterByResolved = (item) => {
        return item.resolved === resolved;
    };

    const filterByItemListResolved = (carts) => {
        carts.map(function (cart) {
            const filteredItems = cart.itemList.filter(function (item) {

                // 0: Show all items
                if (showMarked === 0) {
                    //console.log("showMarked ", showMarked, " returning ", carts)
                    //console.log("item ", item.name, "is ", item.resolved)
                    return true;
                }
                // 1: Show unresolved items
                else if (showMarked === 1 && item.resolved === false) {
                    //console.log("item ", item.name, "is ", item.resolved)
                    return true;
                }
                // 2: Show resolved items
                else if (showMarked === 2 && item.resolved === true) {
                    //console.log("item ", item.name, "is ", item.resolved)
                    return true;
                }
                //console.log("item ", item.name, "is ", item.resolved)
                return false;
            });

            // console.log("changing items for ", cart.name);
            // console.log("from ", cart.itemList);
            // console.log("to ", filteredItems);
            cart.itemList = filteredItems;
            return cart;
        })
        return carts;
        //console.log(carts.map(function(cart) { return cart.name}))
    };

    useEffect(() => {
        let filtered = dataRaw;
        filtered = filtered.filter(cartFilterByOwnerOrMember);
        //console.log("ByOwner", filtered)
        filtered = filtered.filter(cartFilterByResolved);
        //console.log("ByResolved", filtered)
        filtered = filterByItemListResolved(filtered);
        //console.log("ByItem", filtered)

        setFilteredData(filtered);
        //console.log("liu", loggedInUser)
        console.log(`re / calculating data for user `, loggedInUser, ` data`, filtered);

        // }, [data, loggedInUser, resolved, showMarked]);
    }, [dataRaw, loggedInUser, resolved, showMarked, loadingData]);


    // const value = {
    //     data: filteredData,
    //     handlerMap: {
    //         // updateName: ({ name }) => {
    //         //     setData((current) => {
    //         //         current.name = name;
    //         //         return { ...current };
    //         //     });
    //         // },
    //         addItem: (list_id) => {
    //             setData((current) => {
    //                 return current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             itemList: [
    //                                 ...list.itemList,
    //                                 {
    //                                     id: Math.random().toString(36).substr(2, 9),
    //                                     name: "New item",
    //                                     resolved: false,
    //                                 },
    //                             ],
    //                         };
    //                     }
    //                     return list;
    //                 });
    //             });
    //         },
    //         updateItemName: ({ list_id, item_id, new_name }) => {
    //             setData((current) => {
    //                 current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             itemList: list.itemList.map((item) => {
    //                                 if (item.id === item_id) {
    //                                     return { ...item, name: new_name };
    //                                 }
    //                                 return item;
    //                             })
    //                         };

    //                     }
    //                     return { list };
    //                 })
    //             });
    //         },
    //         toggleResolveItem: (list_id, item_id) => {
    //             setData((current) => {
    //                 return current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             itemList: list.itemList.map((item) => {
    //                                 if (item.id === item_id) {
    //                                     return { ...item, resolved: !item.resolved };
    //                                 }
    //                                 return item;
    //                             })
    //                         };
    //                     }
    //                     return list;
    //                 });
    //             });
    //         },
    //         deleteItem: (list_id, item_id) => {
    //             setData((current) => {
    //                 return current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             itemList: list.itemList.filter((item) => item.id !== item_id)
    //                         };
    //                     }
    //                     return list;
    //                 });
    //             });
    //         },
    //         addMember: ({ list_id, memberId }) => {
    //             setData((current) => {
    //                 return current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             memberList: list.memberList.includes(memberId) ? list.memberList : [...list.memberList, memberId]
    //                         };
    //                     }
    //                     return list;
    //                 });
    //             });
    //         },
    //         removeMember: ({ list_id, memberId }) => {
    //             setData((current) => {
    //                 return current.map((list) => {
    //                     if (list.id === list_id) {
    //                         return {
    //                             ...list,
    //                             memberList: list.memberList.filter((member) => member !== memberId)
    //                         };
    //                     }
    //                     return list;
    //                 });
    //             });
    //         },
    //         handleCreate: (name) => {
    //             setData((current) => [
    //                 ...current,
    //                 {
    //                     id: Math.floor(Math.random() * 1000),
    //                     name: name,
    //                     resolved: false, // Assuming this should be `resolved`
    //                     owner: loggedInUser,
    //                     memberList: [],
    //                     itemList: [],
    //                 },
    //             ]);
    //         },
    //         handleDelete: (id) => {
    //             setData((current) => {
    //                 const itemIndex = current.findIndex((item) => item.id === id);
    //                 current.splice(itemIndex, 1);
    //                 return current.slice();
    //             });
    //         },
    //         showMarked,
    //         toggleshowMarked: () => setShowMarked((current) => (current + 1) % 3),
    //         //0 show all
    //         //1 show unresolved
    //         //2 show resolved      
    //         resolved,
    //         toggleResolved: () => { setResolved((current) => !current) }
    //     },
    // }

    const value = {
        handlerMap: {
            //TODO
        },
        carts: filteredData,
        helpers: {
            resolved, setResolved,
            showMarked, setShowMarked,
            loadingData, setLoadingData
        }
    }

    return <DetailContext.Provider value={value}> {children} </DetailContext.Provider>
}

export default DetailProvider;