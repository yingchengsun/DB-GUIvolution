import axios from "axios";
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { useTableSelection } from "./TableSelectionContext";

const handleStyle = { left: 10 };

function FromNode({ data, isConnectable }) {
	const [tables, setTables] = useState([]);
	const { setSelectedTable } = useTableSelection();
	const { nodeValue, handleNodeValueChange } = data;

	useEffect(() => {
		axios.get("/tables").then((response) => {
			setTables(response.data);
		});
	}, []);

	const imgStyle = {
		position: "absolute",
		left: "-55px",
		top: "-150px",
		width: "250px",
		objectFit: "cover", // Maintain aspect ratio and cover the container
		zIndex: -1, // Set a negative z-index to send the image to the back
		opacity: 1,
	};

	const handleTableSelectChange = (event) => {
		const selectedTable = event.target.value;
		handleNodeValueChange(selectedTable); // Update the nodeValue

		// Call setSelectedTable to update the selected table
		setSelectedTable(selectedTable);
	};

	return (
		<div className="FromNode" style={{ position: "relative" }}>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
			/>
			{/* <img alt="" src="../icons/square.png" style={imgStyle} /> */}
			<div style={{ position: "relative" }}>
				<label>FROM:</label>
				<select
					onChange={handleTableSelectChange}
					value={nodeValue}
					className="fromInput"
				>
					<option value="">Select a table</option>
					{tables.map((table) => (
						<option key={table} value={table}>
							{table}
						</option>
					))}
				</select>
			</div>
			{/* <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      /> */}
			<Handle
				type="source"
				position={Position.Bottom}
				id="b"
				isConnectable={isConnectable}
			/>
		</div>
	);
}

export default FromNode;
