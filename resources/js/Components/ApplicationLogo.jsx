export default function ApplicationLogo({ className = 'w-10 h-10 rounded-xl object-cover shadow-lg shadow-rose-500/20' }) {
    return (
        <img
            src="/images/favicon.png"
            alt="Mother of the Year Logo"
            className={className}
        />
    );
}
