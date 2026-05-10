import { Star, Quote } from "lucide-react";
import BorderGlow from "../BorderGlow.jsx";

const accentColors = [
    "from-purple-500 to-violet-600",
    "from-indigo-500 to-blue-600",
    "from-violet-500 to-purple-600",
];

const TestimonialsSection = ({ testimonials }) => {
    return (
        <section className="py-32 relative overflow-hidden">

            {/* Top Gradient Border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-24">

                    <span className="section-badge mb-7 inline-flex text-slate-900 dark:text-slate-100 text-lg px-5 py-2">
                        ❤️ Testimonials
                    </span>

                    <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
                        Loved by{" "}

                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            professionals
                        </span>
                    </h2>

                    <p className="mt-8 text-2xl text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto">
                        Real feedback from real people who use CloudShare every day.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid gap-10 lg:grid-cols-3">

                    {testimonials.map((testimonial, index) => {

                        const gradient =
                            accentColors[index % accentColors.length];

                        return (
                            <BorderGlow
                                key={index}
                                className="hover:-translate-y-2 transition-all duration-300"
                                glowColor="268 100 76"
                                borderRadius={24}
                                backgroundColor="white"
                            >
                                <div
                                    className="group card p-10 flex flex-col gap-7 cursor-default rounded-[24px] h-full"
                                >

                                    {/* Top Hover Gradient */}
                                    <div
                                        className={`absolute top-0 left-10 right-10 h-[3px] rounded-full bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                    />

                                    {/* Quote Icon */}
                                    <Quote
                                        size={50}
                                        className="text-purple-500 flex-shrink-0"
                                    />

                                    {/* Stars */}
                                    <div className="flex items-center gap-2">

                                        {[...Array(5)].map((_, i) => (

                                            <Star
                                                key={i}
                                                size={22}
                                                className={`fill-current
                                                
                                                ${i < testimonial.rating
                                                        ? "text-amber-400"
                                                        : "text-slate-700 dark:text-slate-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Quote Text */}
                                    <blockquote className="flex-1 text-xl text-slate-900 dark:text-slate-100 leading-relaxed font-medium">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* User Info */}
                                    <div className="flex items-center gap-5 pt-7 border-t border-slate-200">

                                        {/* Avatar */}
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-200"
                                        />

                                        {/* Name + Role */}
                                        <div>

                                            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                                                {testimonial.name}
                                            </p>

                                            <p className="text-base text-slate-900 dark:text-slate-100 mt-1">
                                                {testimonial.role} · {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </BorderGlow>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;