import ClaimItem from "@/app/(main)/claim/_components/ClaimItem";
import { TableHeader } from "@/components/ui/table";
import { TClaim } from "@/types/claim";
import { Table } from "lucide-react";

type ClaimListProps = {
  claims: TClaim[];
};

function ClaimList({ claims }: ClaimListProps) {
  return (
    <ul>
      {claims.map((claim) => (
        <ClaimItem key={claim.gift_claimId} claim={claim} />
      ))}
    </ul>
  );
}

export default ClaimList;
