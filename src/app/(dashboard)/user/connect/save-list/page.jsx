import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import UploadExcelForm from '@/components/upload-excel-form';
import React from 'react';

const SaveList = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl md:text-2xl">Save List</CardTitle>
				<CardDescription>
					You can upload your excel file and save it permanently to avoid
					re-upload on every message.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<UploadExcelForm isPermanent={true} />
			</CardContent>
		</Card>
	);
};

export default SaveList;
