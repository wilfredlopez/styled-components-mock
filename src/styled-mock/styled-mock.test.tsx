
import { interLeave, transformString } from './interLeave'
import { render, screen } from '@testing-library/react'
import Styled from './index'



const Title = Styled.h1<{ color?: string }>`
    color: ${props => props.color || 'red'};
`

const Div = Styled.div<{ testId?: number }>`
    background: blue;
`

function TestCom() {
    return <Div data-testid="123">
        <Title color="green">Hello</Title>
    </Div>
}
function testTemplate(template: TemplateStringsArray, ...args: ((p: { testId: number }) => any)[]) {
    const templateArray = Array.from(template)
    for (let i = 0; i < args.length; i++) {
        const fn = args[i]
        const val = fn({ testId: 1 })
        templateArray[i] = templateArray[i] + val
    }
    return templateArray.join('')
}

describe('tag/styled', () => {
    it('creates comp', () => {
        render(<TestCom />)
        const TitleElement = screen.getByText(/Hello/i)
        expect(TitleElement).toBeInTheDocument()
        // screen.debug(TitleElement)
        const ContainerDiv = screen.getByTestId('123')
        expect(ContainerDiv.classList.value).toBeTruthy()
    })

    test('should call function', () => {
        const value = testTemplate`
        background: blue;
        testId: ${(props) => props.testId};
        `

        expect(value).toBe(`
        background: blue;
        testId: 1;
        `)
    })

    test('should interleave', () => {
        const res = interLeave`
            color: ${(props: any) => props.color as any}
        `

        const val = transformString(res, { color: 1 })
        console.log({ res, val })
        expect(val).toBe('\n            color: 1\n        ')
    })
})

