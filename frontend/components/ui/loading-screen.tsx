import { Dumbbell } from "lucide-react"

export function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
            <div className="flex items-center justify-center mb-4">
                <Dumbbell className="h-12 w-12 text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Loading</h2>
            <p className="text-muted-foreground text-center mb-8">Please wait while we prepare your content...</p>
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
        </div>
    )
}

// Add the loading animation keyframes to the global CSS
