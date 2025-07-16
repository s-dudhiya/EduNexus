import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  Calendar,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

export const FinancialServices = () => {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');

  const accountSummary = {
    balance: -2450.75,
    lastPayment: {
      amount: 1500.00,
      date: "2024-01-15",
      method: "Bank Transfer"
    },
    nextDue: {
      amount: 2450.75,
      date: "2024-02-01"
    }
  };

  const transactions = [
    {
      id: 1,
      date: "2024-01-15",
      description: "Payment Received - Spring 2024 Tuition",
      amount: 1500.00,
      type: "credit",
      status: "Completed"
    },
    {
      id: 2,
      date: "2024-01-10",
      description: "Spring 2024 Tuition Fee",
      amount: -3250.00,
      type: "charge",
      status: "Completed"
    },
    {
      id: 3,
      date: "2024-01-10",
      description: "Student Services Fee",
      amount: -350.00,
      type: "charge",
      status: "Completed"
    },
    {
      id: 4,
      date: "2024-01-05",
      description: "Library Fine",
      amount: -25.00,
      type: "charge",
      status: "Completed"
    }
  ];

  const financialAid = {
    totalAwarded: 15000,
    totalDisbursed: 7500,
    awards: [
      {
        name: "Academic Merit Scholarship",
        amount: 8000,
        disbursed: 4000,
        semester: "Fall 2024",
        status: "Active"
      },
      {
        name: "Federal Pell Grant",
        amount: 5000,
        disbursed: 2500,
        semester: "Fall 2024",
        status: "Active"
      },
      {
        name: "Work Study Program",
        amount: 2000,
        disbursed: 1000,
        semester: "Fall 2024",
        status: "Active"
      }
    ]
  };

  const paymentPlans = [
    {
      id: 1,
      name: "4-Payment Plan",
      totalAmount: 12000,
      monthlyPayment: 3000,
      installmentsPaid: 2,
      nextDue: "2024-02-01",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Financial Services</h1>
          <p className="text-muted-foreground">Manage your student account, payments, and financial aid</p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account Summary</TabsTrigger>
            <TabsTrigger value="payments">Make Payment</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="aid">Financial Aid</TabsTrigger>
            <TabsTrigger value="plans">Payment Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className={`p-6 ${accountSummary.balance < 0 ? 'border-destructive' : 'border-success'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className={`h-8 w-8 ${accountSummary.balance < 0 ? 'text-destructive' : 'text-success'}`} />
                  <div>
                    <p className="text-sm text-muted-foreground">Account Balance</p>
                    <div className={`text-2xl font-bold ${accountSummary.balance < 0 ? 'text-destructive' : 'text-success'}`}>
                      ${Math.abs(accountSummary.balance).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {accountSummary.balance < 0 ? 'Amount Due' : 'Credit Balance'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Payment</p>
                    <div className="text-xl font-bold">${accountSummary.lastPayment.amount.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">{accountSummary.lastPayment.date}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-8 w-8 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Next Payment Due</p>
                    <div className="text-xl font-bold">${accountSummary.nextDue.amount.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">{accountSummary.nextDue.date}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Payment Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <h4 className="font-semibold text-destructive mb-1">Payment Due Soon</h4>
                      <p className="text-sm text-muted-foreground">
                        Your next payment of $2,450.75 is due on February 1st, 2024
                      </p>
                      <Button size="sm" className="mt-2">Make Payment</Button>
                    </div>
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-1">Financial Aid Update</h4>
                      <p className="text-sm text-muted-foreground">
                        Your spring semester financial aid disbursement is pending
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{transaction.description}</h4>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">View All Transactions</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Make a Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2 border rounded-md"
                          defaultValue={accountSummary.nextDue.amount}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Current balance: ${Math.abs(accountSummary.balance).toFixed(2)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Bank Transfer (ACH)</option>
                        <option>Credit Card (3% fee)</option>
                        <option>Debit Card</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Date</label>
                      <input type="date" className="w-full p-2 border rounded-md" />
                    </div>

                    <Button className="w-full gap-2">
                      <CreditCard className="h-4 w-4" />
                      Process Payment
                    </Button>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4">Payment Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Payment Amount:</span>
                        <span className="font-medium">${accountSummary.nextDue.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee:</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${accountSummary.nextDue.amount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Payment Options</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Bank Transfer: No fee, 2-3 business days</li>
                        <li>• Credit Card: 3% convenience fee</li>
                        <li>• Debit Card: $2.95 flat fee</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Payment History
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="p-2 border rounded-md text-sm"
                    >
                      <option>Fall 2024</option>
                      <option>Spring 2024</option>
                      <option>Fall 2023</option>
                    </select>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <Card key={transaction.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{transaction.description}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span>{transaction.date}</span>
                            <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <Button size="sm" variant="outline" className="mt-2">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aid" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">${financialAid.totalAwarded.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Awarded</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">${financialAid.totalDisbursed.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Disbursed</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-secondary mb-2">${(financialAid.totalAwarded - financialAid.totalDisbursed).toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Remaining</p>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Aid Awards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialAid.awards.map((award, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{award.name}</h4>
                          <p className="text-sm text-muted-foreground">{award.semester}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">${award.amount.toLocaleString()}</div>
                          <Badge variant={award.status === 'Active' ? 'default' : 'secondary'}>
                            {award.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Disbursed: ${award.disbursed.toLocaleString()}</span>
                          <span>Remaining: ${(award.amount - award.disbursed).toLocaleString()}</span>
                        </div>
                        <Progress value={(award.disbursed / award.amount) * 100} className="h-2" />
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Payment Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentPlans.map((plan) => (
                    <Card key={plan.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{plan.name}</h3>
                          <p className="text-muted-foreground">
                            ${plan.monthlyPayment.toLocaleString()} per month
                          </p>
                        </div>
                        <Badge variant={plan.status === 'Active' ? 'default' : 'secondary'}>
                          {plan.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">Total Amount:</span>
                            <span className="font-medium">${plan.totalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Monthly Payment:</span>
                            <span className="font-medium">${plan.monthlyPayment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Payments Made:</span>
                            <span className="font-medium">{plan.installmentsPaid} of 4</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Next Due Date:</span>
                            <span className="font-medium">{plan.nextDue}</span>
                          </div>
                        </div>

                        <div>
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{plan.installmentsPaid}/4 payments</span>
                            </div>
                            <Progress value={(plan.installmentsPaid / 4) * 100} className="h-2" />
                          </div>
                          <Button className="w-full mt-4">
                            Make Next Payment
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6 bg-muted/30">
                  <h3 className="font-semibold mb-4">Set Up New Payment Plan</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Spread your tuition payments across multiple installments with our flexible payment plans.
                  </p>
                  <Button variant="outline">Contact Financial Services</Button>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};