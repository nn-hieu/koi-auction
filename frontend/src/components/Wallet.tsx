import { payByVNPay } from '@/service/paymentService';
import { getTransaction } from '@/service/transactionService';
import { Transaction } from '@/type/transaction';
import { formatMoney } from '@/util/helper';
import { formatInTimeZone } from 'date-fns-tz';
import React, { useEffect, useRef, useState } from 'react'
import { Checkbox } from './ui/checkbox';
import { useAuth } from '@/context/AuthContext';
import { addWalletBalance } from '@/service/walletService';
import { Button, Form, InputNumber, Modal } from 'antd';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {

    const { user, balance } = useAuth();
    const { toast } = useToast();

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransactions, setSelectedTransactions] = useState<Set<number>>(new Set());
    const timezone = 'Asia/Bangkok';

    //Create Trans
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [balance, setBalance] = useState<number>(0);
    const transactionBalancedRef = useRef<number>(0)

    const showModal = () => {
        setIsModalOpen(true);
    };


    useEffect(() => {

        const fetchTransactions = async () => {
            const data = await getTransaction();

            const filterTransactions = data.filter((transaction: Transaction) => transaction.memberId === user?.id && transaction.paymentType === 'WALLET' && transaction.status === 'PENDING');

            setTransactions(filterTransactions.reverse());
        };

        fetchTransactions();
    }, [user]);

    const toggleSelection = (transactionId: number) => {
        setSelectedTransactions((prev) => {
            const newSelected = new Set(prev);
            if (newSelected.has(transactionId)) {
                newSelected.delete(transactionId);
            } else {
                newSelected.add(transactionId);
            }
            return newSelected;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Selected transactions to pay:', Array.from(selectedTransactions));
        const paymentUrl = await payByVNPay(Array.from(selectedTransactions));
        if (paymentUrl)
            window.open(paymentUrl, '_blank');
        else
            console.error('Failed to get payment URL');
    };

    const addBalance = async () => {
        addWalletBalance(transactionBalancedRef.current).then((data) => {
            setTransactions([data, ...transactions]);
            toast({
                variant: "success",
                title: "Transaction created successfully!",
            });
        }).catch((error) => {
            console.log("error::v:: ", error);
            toast({
                variant: "destructive",
                title: "Transaction created failed!",
            });
        });
    }

    useEffect(() => {
        console.log("abc: ", transactionBalancedRef.current);

    }, [transactionBalancedRef.current])

    return (
        <>
            <Modal title="Create Transaction" open={isModalOpen} onCancel={() => { setIsModalOpen(false); }} onOk={() => {
                addBalance();
                setIsModalOpen(false);
            }}>
                <Form layout="vertical" autoComplete="off">
                    <Form.Item
                        name="age"
                        label="Input Amount: (*if amount is less than 1000, the system will set it to 1000)"
                    >
                        <InputNumber
                            min={1000}
                            className='w-1/2'
                            value={transactionBalancedRef.current}
                            onChange={(value) => {
                                if (value && (value < 1000 || value < 0)) {
                                    alert("Amount must be 1000 or higher.");
                                    transactionBalancedRef.current = 1000; // Reset to 1000 if below minimum or negative
                                    return;
                                } else {
                                    transactionBalancedRef.current = value || 0;
                                }
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <div >
                <div>Your current balance: {formatMoney(balance ? balance : 0)} </div>
                <Button type="primary" onClick={showModal}>
                    Create Transaction
                </Button>

            </div>
            <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
                    <div className="grid grid-cols-12 bg-gray-100 text-gray-700 font-semibold p-3">
                        <div className="col-span-1">No.</div>
                        <div className="col-span-3">Description</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-3">Created Date</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1">Action</div>
                    </div>

                    <div className="">
                        {transactions.map((transaction, index) => (
                            <div key={transaction.id} className="grid grid-cols-12 text-gray-800 p-3">
                                <div className="col-span-1">
                                    {transactions.length - index}
                                </div>
                                <div className="col-span-3">{transaction.description}</div>
                                <div className="col-span-2 text-black" >{formatMoney(transaction.amount)} VND</div>
                                <div className="col-span-3">{formatInTimeZone(new Date(transaction.created), timezone, "dd.MM.yyyy HH:mm a")}</div>
                                <div className={`col-span-2 ${transaction.status === 'PENDING' ? 'text-orange-500' : 'text-green-500'}`}>
                                    {transaction.status}
                                </div>
                                <div className="col-span-1">
                                    {transaction.status === 'PENDING' && <Checkbox
                                        value={transaction.id}
                                        checked={selectedTransactions.has(transaction.id)}
                                        onClick={() => toggleSelection(transaction.id)}
                                    />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex justify-end mt-4 mr-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Proceed to Payment
                    </button>
                </div>
            </form>
        </>
    )
}

export default Wallet