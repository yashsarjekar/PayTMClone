import Navbar from "./Navbar";

export default function LandingPage() {
    return <div>
        <Navbar></Navbar>
        <div className="grid  md:grid-cols-2 mt-20">
            <div className="flex flex-col  items-center mt-48 ml-20 w-3/6">
                <div className='font-bold text-4xl'>
                    India's Most-loved Payments App
                </div>
                <div className="pt-10">
                    Recharge & pay bills, book flights & movie tickets, open a savings account, invest in stocks & mutual funds, and do a lot more.
                </div>
            </div>
            <div>
                <img className="w-5/6" src="https://assetscdn1.paytm.com/images/catalog/view_item/850762/1715933362922.png" alt="BannerImage" class="_1gZ-6" />
            </div>
        </div>
    </div>
}