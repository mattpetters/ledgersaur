// [components/AccountsList.tsx](components/AccountsList.tsx)
interface Props {
    accounts: string[];
  }
  
  export default function AccountsList({ accounts }: Props) {
    return (
      <div>
        <ul class="mb-4">
          {accounts.map((account, index) => (
            <li class="p-2 border-b" key={index}>
              {account}
            </li>
          ))}
        </ul>
      </div>
    );
  }