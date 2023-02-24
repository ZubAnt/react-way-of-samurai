import {create} from 'react-test-renderer'
import {Paginator} from "./Paginator";

describe('Paginator component tests', () => {
    test('buttons counts should be 4', () => {
        const component = create(
            <Paginator
                current={1}
                total={100}
                size={10}
                onPageChange={() => {}}
            />
        )
        const root = component.root;
        const buttons = root.findAllByType('button');
        expect(buttons.length).toBe(4);
    })

    test('buttons counts should be 7', () => {
        const component = create(
            <Paginator
                current={5}
                total={100}
                size={10}
                onPageChange={() => {}}
            />
        )
        const root = component.root;
        const buttons = root.findAllByType('button');
        expect(buttons.length).toBe(7);
    })
})