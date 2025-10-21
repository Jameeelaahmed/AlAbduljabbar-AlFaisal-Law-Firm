import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Linkedin, Mail, Award, Briefcase, User } from "lucide-react";
import { useHomePage } from "../../../hooks/useHomePage";

function OurTeam() {
    const { i18n } = useTranslation?.() ?? { t: (s) => s, i18n: { language: "ar" } };
    const isRtl = (i18n?.language || document.documentElement.dir) === "ar";
    const { data: data } = useHomePage();
    let teamMembers = data?.lawyers || [];

    return (
        <section className="py-20 bg-linear-to-b from-bg to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                        <Users size={18} />
                        {isRtl ? "فريقنا المحترف" : "Our Professional Team"}
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4 leading-tight">
                        {isRtl ? (
                            <>
                                <span className="block">تعرف على</span>
                                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                                    فريقنا القانوني
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="block">Meet Our</span>
                                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Legal Team
                                </span>
                            </>
                        )}
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {isRtl
                            ? "فريق من المحامين المتخصصين ذوي الخبرة الواسعة في مختلف المجالات القانونية بين السعودية ومصر"
                            : "A team of specialized lawyers with extensive experience in various legal fields across Saudi Arabia and Egypt"
                        }
                    </p>

                    <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.id}
                            className="group bg-white rounded-3xl shadow-lg hover:shadow-xl border border-secondary/10 p-6 transition-all duration-500 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Image & Basic Info */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="w-32 h-32 rounded-full bg-linear-to-br from-primary to-accent p-1 mx-auto">
                                        {member.photoUrl ? (
                                            <img
                                                src={member.photoUrl}
                                                alt={isRtl ? member.nameAr : member.nameEn}
                                                className="w-full h-full rounded-full object-cover bg-white"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                                <User size={48} className="text-primary" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Experience Badge */}
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        {member.yearsOfExperience}{" "}
                                        {isRtl
                                            ? member.yearsOfExperience === 1
                                                ? "سنة"
                                                : member.yearsOfExperience === 2
                                                    ? "سنتان"
                                                    : member.yearsOfExperience >= 3 && member.yearsOfExperience <= 10
                                                        ? "سنوات"
                                                        : "سنة"
                                            : member.yearsOfExperience === 1
                                                ? "Year"
                                                : "Years"
                                        }
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-text mb-2">
                                    {isRtl ? member.nameAr : member.nameEn}
                                </h3>
                                <p className="text-primary font-semibold mb-1">
                                    {isRtl ? member.positionAr : member.positionEn}
                                </p>
                                <p className="text-secondary text-sm mb-4">
                                    {isRtl ? member.specializationAr : member.specializationEn}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed text-sm mb-6 text-center">
                                {isRtl ? member.descriptionAr : member.descriptionEn}
                            </p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-3 pt-4 border-t border-secondary/20">
                                {member.linkedIn && (
                                    <a
                                        href={member.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group/linkedin"
                                    >
                                        <Linkedin size={18} className="group-hover/linkedin:scale-110 transition-transform" />
                                    </a>
                                )}
                                {member.gmail && (
                                    <a
                                        href={`mailto:${member.gmail}`}
                                        className="w-10 h-10 bg-accent/10 hover:bg-accent text-accent hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group/email"
                                    >
                                        <Mail size={18} className="group-hover/email:scale-110 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
                    {/*
                        { icon: Users, number: teamMembers.length || "0", label: isRtl ? "محامٍ متخصص" : "Expert Lawyers" },
                        { icon: Award, number: "15+", label: isRtl ? "سنوات خبرة" : "Years Experience" },
                        { icon: Briefcase, number: "1000+", label: isRtl ? "قضية منجزة" : "Cases Handled" },
                        { icon: Users, number: "2", label: isRtl ? "دول" : "Countries" }
                    */}
                    {[]?.map((stat, index) => (
                        <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-secondary/10">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <stat.icon size={24} className="text-primary" />
                            </div>
                            <div className="text-2xl font-bold text-text mb-1">
                                {stat.number}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default OurTeam;