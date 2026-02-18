import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-black hover:bg-primary-hover font-bold',
            secondary: 'bg-secondary text-white hover:bg-opacity-80',
            outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-black',
            ghost: 'hover:bg-white/10 text-white',
            neon: 'bg-transparent border border-primary text-primary shadow-[0_0_10px_rgba(0,191,255,0.5)] hover:shadow-[0_0_20px_rgba(0,191,255,0.8)] hover:bg-primary/10 transition-all duration-300',
        }

        const sizes = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 py-2',
            lg: 'h-12 px-6 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button }
