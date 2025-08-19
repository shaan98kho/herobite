"use client"
import Hero from "@/components/Hero"

export default function About() {
    return <>
        <Hero 
            caption="About HeroBite"
            description="Our mission is to reduce food waste by connecting businesses with surplus food customers looking for great deals"
            imgUrl="/assets/about_us.jpg"
            actionName="Learn More"
            classesForWrp="text-white"
        />
        <div className="px-8">
            <h2 className="pt-10 pb-4 text-3xl font-bold">Our Mission and Vision</h2>
            <p className="">At Surplus Market, we envision a world where no food goes to waste. Our mission is to create a sustainable marketplace that benefits both businesses and consumers. We aim to reduce food waste by providing a platform for businesses to sell their surplus food at discounted prices, while offering customers access to high-quality food at affordable rates.</p>

            <h2 className="pt-10 pb-4 text-3xl font-bold">How It Works</h2>
            <h3 className="font-bold text-2l pb-2">For Businesses</h3>
            <p>Businesses can easily list their surplus food items on our platform, reaching a wider audience of potential buyers. Our intuitive interface allows for quick and efficient management of listings, ensuring minimal effort in selling surplus inventory.</p>
            <h3 className="font-bold text-2l pb-2 pt-4">For Customers</h3>
            <p>Customers can browse a variety of surplus food items from local businesses, enjoying significant discounts on high-quality products. Our platform provides detailed information about each item, including expiration dates and storage instructions, ensuring transparency and satisfaction.</p>
        </div>
    </>
}