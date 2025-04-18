import { useChatContext } from "@copilotkit/react-ui";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
    const { setOpen } = useChatContext();

    return (
        <div className="flex items-center justify-between py-3 px-5 border-b border-gray-300 rounded-t">
            <h2 className="text-lg font-semibold">Todo Assistant</h2>
            <button
                onClick={() => setOpen(false)}
                className="px-2 py-1 cursor-pointer"
            >
                <RxCross2 size={25} />
            </button>
        </div>
    );
};

export default Header;
