import { Star, Quote } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
    verified: boolean;
}

export function TestimonialsSection() {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Verified Buyer',
            image: 'https://i.pravatar.cc/150?img=1',
            rating: 5,
            text: 'Absolutely love shopping here! The quality is outstanding and delivery was super fast. Will definitely order again!',
            verified: true,
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Regular Customer',
            image: 'https://i.pravatar.cc/150?img=12',
            rating: 5,
            text: 'Best online shopping experience ever! Customer service is top-notch and the products exceeded my expectations.',
            verified: true,
        },
        {
            id: 3,
            name: 'Emma Williams',
            role: 'Happy Shopper',
            image: 'https://i.pravatar.cc/150?img=5',
            rating: 5,
            text: 'I was skeptical at first, but the quality and service blew me away. This is now my go-to store for everything!',
            verified: true,
        },
        {
            id: 4,
            name: 'David Martinez',
            role: 'Verified Buyer',
            image: 'https://i.pravatar.cc/150?img=13',
            rating: 4,
            text: 'Great products and amazing prices! The checkout process was smooth and I got my order within 2 days.',
            verified: true,
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            role: 'Regular Customer',
            image: 'https://i.pravatar.cc/150?img=9',
            rating: 5,
            text: 'The product quality is exceptional! Everything arrived perfectly packaged. Highly recommend to everyone!',
            verified: true,
        },
        {
            id: 6,
            name: 'James Wilson',
            role: 'Happy Customer',
            image: 'https://i.pravatar.cc/150?img=14',
            rating: 5,
            text: 'Five stars all the way! Fast shipping, great quality, and excellent customer support. What more could you ask for?',
            verified: true,
        },
    ];

    return (
        <section className="py-20 bg-background-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 font-body">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Customer Reviews</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4">
                        What Our Customers Say
                    </h2>

                    <p className="text-lg text-secondary max-w-2xl mx-auto font-body">
                        Don't just take our word for it - hear from our happy customers
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Quote icon */}
                            <div className="absolute top-4 right-4 opacity-10">
                                <Quote className="w-16 h-16 text-accent" />
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating
                                            ? 'text-accent fill-accent'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Review text */}
                            <p className="text-secondary mb-6 leading-relaxed relative z-10 font-body">
                                "{testimonial.text}"
                            </p>

                            {/* Customer info */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                                    />
                                    {testimonial.verified && (
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                                    <p className="text-sm text-secondary">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}