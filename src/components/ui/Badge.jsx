import clsx from 'clsx'

export default function Badge({
  children,
  variant = 'success',
}) {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-green-100 text-green-700':
            variant === 'success',

          'bg-yellow-100 text-yellow-700':
            variant === 'warning',

          'bg-red-100 text-red-700':
            variant === 'danger',

          'bg-gray-100 text-gray-700':
            variant === 'default',
        }
      )}
    >
      {children}
    </span>
  )
}