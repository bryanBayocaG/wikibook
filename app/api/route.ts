import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { NextResponse } from "next/server";

const getAuthId = (req: Request): string | null => {
  return req.headers.get("Authorization")?.replace("Bearer ", "") || null;
};

export async function POST(req: Request) {
  try {
    const authId = getAuthId(req);
    const path = `Users/${authId}/wordsAndDef`;
    if (!authId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { name, definition } = await req.json();

    const docRef = collection(db, path);
    const querySnapshot = await getDocs(
      query(docRef, where("name", "==", name))
    );
    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Word already exists" },
        { status: 400 }
      );
    }
    const docData = await addDoc(docRef, {
      definition: definition,
      name: name,
    });
    return NextResponse.json(
      {
        id: docData.id,
        name: name,
        definition: definition,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add data " + error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const authId = getAuthId(req);

    if (!authId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const querySnapshot = await getDocs(
      collection(db, `Users/${authId}/wordsAndDef`)
    );

    const words = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(words);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to add data: " + error.message },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(req: Request) {
  try {
    const authId = getAuthId(req);
    if (!authId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, definition } = await req.json();

    if (!id || !name || !definition) {
      return NextResponse.json(
        { error: "ID, name, and definition are required" },
        { status: 400 }
      );
    }

    const path = `Users/${authId}/wordsAndDef`;
    const docRef = doc(db, path, id);

    await updateDoc(docRef, { name, definition });

    return NextResponse.json(
      { message: "Document updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const authId = getAuthId(req);
    const { id } = await req.json();
    if (!authId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const path = `Users/${authId}/wordsAndDef`;
    const docRef = doc(db, path, id);
    await deleteDoc(docRef);

    return NextResponse.json(
      { message: "Document deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
