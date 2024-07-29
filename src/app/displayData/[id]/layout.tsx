export default function displayDataLayout({
    children,
}: {
    children:React.ReactNode;
}) {
    return (
        <nav>
            {children}
        </nav>
    );
}

