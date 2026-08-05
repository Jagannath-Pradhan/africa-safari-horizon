import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-green-700 text-white hover:bg-green-800':
            variant === 'primary',

          'bg-gray-100 text-gray-800 hover:bg-gray-200':
            variant === 'secondary',

          'bg-red-600 text-white hover:bg-red-700':
            variant === 'danger',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}