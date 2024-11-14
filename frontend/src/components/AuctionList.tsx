import { NavLink } from "react-router-dom";
import { Auction } from "../type/auction.d";
import AuctionItem from "./AuctionItem";
import { useEffect, useState } from "react";
import { getAuctionByStatus } from "@/service/auctionService";

const AuctionList = () => {

   const [auctionList, setAuctionList] = useState<Auction[]>([]);

   useEffect(() => {
      getAuctionByStatus('CLOSED').then((data) => {

         setAuctionList(data.sort((a: Auction, b: Auction) => {
            return b.id - a.id;
         }))
      });
   }, []);

   return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {auctionList && auctionList.map((auction) => (
            <NavLink
               to={'/auction/' + auction.id}>
               <AuctionItem key={auction.id} auction={auction} />
            </NavLink>
         ))}
      </div>
   )
}

export default AuctionList