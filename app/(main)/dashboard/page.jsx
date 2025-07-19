import { getUserAccounts } from '@/actions/dashboard';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import React from 'react';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import { BudgetProgress } from './_components/budget-progress';

async function DashboardPage () {
const accounts = await getUserAccounts()

const defaultAccount = accounts?.find((account) => account.isDefault);

let budgetData = null;
if (defaultAccount){
    budgetData = await getCurrentBudget(defaultAccount.id);
}
  return (
    <div className =  "space-y-8">
        {/*Budget Progress */}
        <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
        />


        {/*Overview*/}

        {/*Accounts Grid */}
        <div className = "grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CreateAccountDrawer>
                <Card className = 'hover:shadow-md transition-shadow cursor-pointer borer-dashed'>
                    <CardContent className = "flex flex-col items-center jusitfy-center text-muted-foreground h-full pt-5">
                        <Plus className = "h-10 w-10 mb-2"></Plus>
                        <p className = "text-sm font-medium">Add New Account</p>
                    </CardContent>
                </Card>
            </CreateAccountDrawer>

            {accounts.length>0 && accounts?.map((account) =>{
                return <AccountCard key={account.id} account = {account}/>;
            })}
        </div>
    </div>
  )
}

export default DashboardPage;