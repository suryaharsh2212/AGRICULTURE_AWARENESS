import React, { useState, useEffect } from 'react';
import { surveysAPI } from '../../services/api';
import { Send, CheckCircle2, AlertCircle, Languages } from 'lucide-react';
import { surveyTranslations } from '../../data/surveyTranslations';

const SurveyForm = () => {
    // Language state with persistence
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('surveyLanguage') || 'en';
    });

    const t = surveyTranslations[lang];

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'hi' : 'en';
        setLang(newLang);
        localStorage.setItem('surveyLanguage', newLang);
    };

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        whatsappNumber: '',
        crop: '',
        farmingType: '',
        landSize: '',
        soilType: '',
        seedPreference: '',
        reason: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await surveysAPI.submit(formData);
            setStatus('success');
            setFormData({
                name: '',
                address: '',
                whatsappNumber: '',
                crop: '',
                farmingType: '',
                landSize: '',
                soilType: '',
                seedPreference: '',
                reason: ''
            });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error.message || t.error);
        }
    };

    return (
        <section id="survey" className="bg-transparent">
            <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-green-100">
                    <div className="bg-green-600 px-6 sm:px-8 py-8 sm:py-10 text-white relative">
                        {/* Language Toggle */}
                        <div className="absolute top-4 right-4 z-10">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-sm transition-all text-sm font-medium border border-white/30"
                            >
                                <Languages size={16} />
                                <span>{lang === 'en' ? 'HINDI' : 'ENGLISH'}</span>
                            </button>
                        </div>

                        <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 hidden sm:block">
                            <Send size={120} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.title}</h2>
                        <p className="text-green-50 text-sm sm:text-base opacity-90">{t.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.fullName}</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.name}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.whatsapp}</label>
                                <input
                                    required
                                    type="tel"
                                    name="whatsappNumber"
                                    value={formData.whatsappNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.whatsapp}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.address}</label>
                                <input
                                    required
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.address}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.majorCrop}</label>
                                <input
                                    required
                                    type="text"
                                    name="crop"
                                    value={formData.crop}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.crop}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.farmingType}</label>
                                <select
                                    required
                                    name="farmingType"
                                    value={formData.farmingType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                >
                                    <option value="">{t.selectFarming}</option>
                                    <option value="Organic">{t.farmingOptions.organic}</option>
                                    <option value="Conventional">{t.farmingOptions.conventional}</option>
                                    <option value="Natural Farming">{t.farmingOptions.natural}</option>
                                    <option value="Hydroponics">{t.farmingOptions.hydroponics}</option>
                                    <option value="Other">{t.farmingOptions.other}</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.landSize}</label>
                                <input
                                    required
                                    type="text"
                                    name="landSize"
                                    value={formData.landSize}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.landSize}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.soilType}</label>
                                <input
                                    required
                                    type="text"
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.soilType}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 block">{t.seedPreference}</label>
                                <input
                                    required
                                    type="text"
                                    name="seedPreference"
                                    value={formData.seedPreference}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
                                    placeholder={t.placeholders.seeds}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 block">{t.challenges}</label>
                            <textarea
                                required
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none resize-none"
                                placeholder={t.placeholders.challenges}
                            ></textarea>
                        </div>

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center space-x-2 ${
                                status === 'loading' ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {status === 'loading' ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>{t.submit}</span>
                                    <Send size={18} />
                                </>
                            )}
                        </button>

                        {status === 'success' && (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center space-x-3 border border-green-200 animate-fade-in">
                                <CheckCircle2 className="shrink-0" />
                                <p className="font-medium">{t.success}</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center space-x-3 border border-red-200 animate-fade-in">
                                <AlertCircle className="shrink-0" />
                                <p className="font-medium">{errorMessage}</p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SurveyForm;
