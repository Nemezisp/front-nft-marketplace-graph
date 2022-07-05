import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";
import NftPreview from "../components/NftPreview";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  return (
    <div className={styles.container}>
      <h2>Recently Listed:</h2>
      <div className={styles.cardsContainer}>
        {isWeb3Enabled ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft;
              return (
                <div>
                  <NftPreview
                    price={price}
                    tokenId={tokenId}
                    nftAddress={nftAddress}
                    seller={seller}
                    key={`${nftAddress}${tokenId}`}
                    marketplaceAddress={marketplaceAddress}
                  />
                </div>
              );
            })
          )
        ) : (
          <div>Connect to Web3 to see NFTs!</div>
        )}
      </div>
    </div>
  );
}
