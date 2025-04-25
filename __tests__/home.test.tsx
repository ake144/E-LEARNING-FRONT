import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Loading from '@/app/[lang]/(main)/loading/page'

it('Loading component should render correctly', () => {
render(<Loading />)

const heading = screen.getByRole('heading', { level: 3 })
const headingText = screen.getByText(/This is the admin dashboard/i)

expect(heading).toBeInTheDocument()
expect(headingText).toBeInTheDocument()
expect(heading).toHaveTextContent('This is the admin dashboard')
expect(heading).toHaveClass('text-2xl text-black font-semibold')

})


