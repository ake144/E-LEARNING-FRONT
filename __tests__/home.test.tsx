import Home from '@/app/[lang]/admin/page';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'


// it('Loading component should render correctly', () => {
//     render(<Home  />)

//     const heading = screen.getByRole('heading', { name: /This is the admin dashboard/i, hidden:true }, );
//     expect(heading).toBeInTheDocument();
// })


test('there is no I in tea ', ()=>{
expect('tea').not.toMatch(/I/)
expect('tea').toMatch(/t/)})

// jest.mock('../components/admin/main', () => {
//     return   jest.fn(()=><div>StatCard Mock</div>)
// }
// )

// it('renders StatCard component', ()=>{
//     render(<Home  />)
//     expect(screen.getByText('StatCard Mock')).toBeInTheDocument()
// })


// it('has correct class names for the heading',()=>{
//     render(<Home  />)
//     const heading = screen.getByRole('heading',{ name: /This is the admin dashboard/i, hidden:true }, );
//     expect(heading).toHaveClass('text-2xl font-bold text-gray-900 dark:text-white')
//     expect(heading).toHaveClass('mb-4')
//     expect(heading).toHaveClass('font-bold')
// })

// test('sum',()=>{
//     const sum = (a:number, b:number) => a + b
//     expect(sum(1,4)).toBeGreaterThanOrEqual(4)
//     expect(sum(1,4)).toBeLessThanOrEqual(5)
//     expect(sum(1,4)).toBe(5)
// })

// it('matches the snapshot', ()=>{
//     const {asFragment}  = render(<Home  />)
//     expect(asFragment()).toMatchSnapshot()
// }
// )


// it('Loading component should render correctly', () => {
// render(<Loading />)
// const headingText = screen.getByText(/This is the admin dashboard/i)

// expect(headingText).toBeInTheDocument()

// })



// test('two plus two is four', () => {
//     expect(2 + 2).toBe(4);
//   });